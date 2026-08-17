from __future__ import annotations

from dataclasses import asdict
from typing import Any

import sympy as sp
from sympy.parsing.sympy_parser import implicit_multiplication_application, parse_expr, standard_transformations

TRANSFORMATIONS = standard_transformations + (implicit_multiplication_application,)


def parse_expression(text: str) -> sp.Expr:
    normalized = text.replace("^", "**").replace("−", "-")
    return parse_expr(normalized, transformations=TRANSFORMATIONS, evaluate=True)


def equation_residual(text: str) -> sp.Expr:
    if "=" not in text:
        return parse_expression(text)
    lhs, rhs = text.split("=", 1)
    return sp.together(parse_expression(lhs) - parse_expression(rhs))


def _ratio_is_nonzero_constant_or_symbol(ratio: sp.Expr, assumptions: tuple[str, ...]) -> bool:
    if ratio == 0:
        return False
    if ratio.is_number:
        return ratio != 0
    assumption_text = " ".join(assumptions)
    if "a != 0" in assumption_text and ratio.has(sp.Symbol("a")):
        return True
    return bool(ratio.free_symbols) and not ratio.equals(0)


def verify_equivalence(before: str, after: str, assumptions: tuple[str, ...] = ()) -> dict[str, Any]:
    try:
        before_residual = equation_residual(before)
        after_residual = equation_residual(after)
        if sp.simplify(before_residual - after_residual) == 0:
            return {"status": "PASS", "method": "identical_residual", "before": str(before_residual), "after": str(after_residual)}
        ratio = sp.cancel(before_residual / after_residual)
        if _ratio_is_nonzero_constant_or_symbol(ratio, assumptions):
            return {"status": "PASS", "method": "nonzero_residual_ratio", "ratio": str(ratio)}
        return {"status": "FAIL", "method": "residual_mismatch", "before": str(before_residual), "after": str(after_residual), "ratio": str(ratio)}
    except Exception as exc:  # noqa: BLE001
        return {"status": "ERROR", "method": "parse_error", "message": str(exc)}


def verify_step(step) -> dict[str, Any]:
    verification = step.verification
    if verification.type in {"binding_map", "representation", "conclusion"}:
        if not verification.expected.strip():
            return {"status": "FAIL", "method": "missing_declarative_expectation"}
        return {"status": "PASS", "method": verification.type, "expected": verification.expected}
    if verification.type in {"symbolic_equivalence", "equation_form"}:
        result = verify_equivalence(step.from_state, step.to_state, verification.assumptions)
        if verification.type == "equation_form" and result["status"] == "PASS":
            try:
                expression = equation_residual(step.to_state)
                symbols = {str(symbol) for symbol in expression.free_symbols}
                if not {"a", "b", "c", "x"}.issubset(symbols):
                    result = {"status": "FAIL", "method": "missing_quadratic_symbols", "symbols": sorted(symbols)}
            except Exception as exc:  # noqa: BLE001
                result = {"status": "ERROR", "method": "form_parse_error", "message": str(exc)}
        return result
    if verification.type == "symbol_presence":
        symbols = {str(symbol) for symbol in equation_residual(step.to_state).free_symbols}
        expected = {token.strip().replace("_present", "") for token in verification.expected.split(",") if token.strip()}
        missing = sorted(expected - symbols)
        return {"status": "PASS" if not missing else "FAIL", "method": "symbol_presence", "missing": missing, "symbols": sorted(symbols)}
    return {"status": "WARN", "method": "not_implemented", "type": verification.type}
