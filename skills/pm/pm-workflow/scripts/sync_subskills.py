#!/usr/bin/env python3
"""Sync pm-workflow bundled subskills into the global Codex skills directory."""

from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
SUBSKILLS_ROOT = SKILL_ROOT / "subskills"


def default_global_root() -> Path:
    codex_home = os.environ.get("CODEX_HOME")
    if codex_home:
        return Path(codex_home) / "skills"
    return Path.home() / ".codex" / "skills"


def copy_skill(source: Path, destination: Path, overwrite: bool) -> str:
    if not (source / "SKILL.md").exists():
        return "skipped: missing SKILL.md"

    if destination.exists():
        if not overwrite:
            return "exists: skipped"
        shutil.rmtree(destination)

    destination.parent.mkdir(parents=True, exist_ok=True)
    ignore = shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store")
    shutil.copytree(source, destination, ignore=ignore)
    return "copied"


def main() -> int:
    parser = argparse.ArgumentParser(description="Copy pm-workflow bundled subskills to CODEX_HOME/skills.")
    parser.add_argument("--global-root", default="", help="Global skills directory. Defaults to CODEX_HOME/skills or ~/.codex/skills.")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing global skill directories.")
    parser.add_argument("--skill", action="append", default=[], help="Sync only the named skill. Can be repeated.")
    args = parser.parse_args()

    global_root = Path(args.global_root).expanduser() if args.global_root else default_global_root()
    selected = set(args.skill)
    sources = [p for p in sorted(SUBSKILLS_ROOT.iterdir()) if p.is_dir()]
    if selected:
        sources = [p for p in sources if p.name in selected]

    if selected and not sources:
        print(f"No matching subskills found in {SUBSKILLS_ROOT}")
        return 1

    print(f"Global skills directory: {global_root}")
    for source in sources:
        status = copy_skill(source, global_root / source.name, args.overwrite)
        print(f"{source.name}: {status}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
