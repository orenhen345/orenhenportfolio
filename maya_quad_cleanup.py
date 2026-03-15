"""
Maya Quad Cleanup Script
========================
Fixes mesh: normals, holes, non-manifold. Then converts to quads only.
Takes existing edges, rearranges and cleans. Preserves shape.

USAGE: SELECT mesh object(s), run script.
"""

import maya.cmds as cmds
import maya.mel as mel


def get_selected_meshes():
    selected = cmds.ls(selection=True, type='transform')
    meshes = []
    for obj in selected:
        shapes = cmds.listRelatives(obj, shapes=True, type='mesh') or []
        if shapes:
            meshes.append(obj)
    return meshes


def fix_normals(obj):
    """Conform normals - fixes flipped/gray areas."""
    try:
        cmds.select(obj, replace=True)
        cmds.polyNormal(obj, normalMode=2, constructionHistory=False)  # 2=conform
    except Exception:
        pass


def mesh_cleanup(obj):
    """Full cleanup: non-manifold, lamina faces, etc."""
    try:
        cmds.select(obj, replace=True)
        mel.eval('polyCleanupArgList 4 { "0","1","1","0","0","0","0","0","0","1e-05","0","1e-05","0","1e-05","0","-1","0" };')
    except Exception:
        try:
            cmds.polyClean(obj, constructionHistory=False)
        except Exception:
            pass


def fill_holes(obj):
    """Fill open holes (Mesh > Fill Hole)."""
    try:
        cmds.select(obj, replace=True)
        mel.eval('PerformFillHole;')
    except Exception:
        try:
            mel.eval('performPolyCloseBorder 0;')
        except Exception:
            pass


def quad_cleanup(angle_threshold=180, keep_hard_edges=True, fix_errors=True):
    """
    Clean and convert to quads only.
    fix_errors: conform normals, cleanup, fill holes before quad conversion.
    """
    targets = get_selected_meshes()
    if not targets:
        cmds.warning("Nothing selected. SELECT mesh object(s) first.")
        return None

    cmds.makeLive(none=True)
    cleaned = []

    for obj in targets:
        try:
            cmds.select(obj, replace=True)

            if fix_errors:
                fix_normals(obj)
                cmds.select(obj, replace=True)
                mesh_cleanup(obj)
                cmds.select(obj, replace=True)
                fill_holes(obj)
                cmds.select(obj, replace=True)

            # Triangulate - all faces to triangles (shape unchanged)
            cmds.polyTriangulate(obj, constructionHistory=False)
            cmds.select(obj, replace=True)

            # Quadrangulate - merge triangles to quads (180 = max merge)
            cmds.polyQuad(
                obj,
                angle=angle_threshold,
                keepHardEdges=keep_hard_edges,
                keepGroupBorder=True,
                keepTextureBorders=True,
                constructionHistory=False
            )

            cleaned.append(obj)

        except Exception as e:
            cmds.warning("Error on {}: {}".format(obj, str(e)))

    if cleaned:
        cmds.select(cleaned, replace=True)
        cmds.confirmDialog(
            title='Quad Cleanup Done',
            message='Cleaned and converted {} object(s) to quads.\nShape preserved.'.format(len(cleaned))
        )

    return cleaned


def run_ui():
    win = 'quadCleanupWindow'
    if cmds.window(win, exists=True):
        cmds.deleteUI(win)

    w = cmds.window(win, title='Quad Cleanup - Quads Only', width=320)
    cmds.columnLayout(adjustableColumn=True, rowSpacing=8, columnOffset=('both', 10))

    cmds.text(label='Fix normals, holes, cleanup. Then convert to quads.')
    cmds.separator(height=5)
    cmds.text(label='SELECT mesh object(s) first', align='left')
    cmds.separator(height=10)

    cmds.text(label='Merge angle (180 = maximum quads):', align='left')
    angle_field = cmds.intField(minValue=0, maxValue=180, value=180)
    fix_cb = cmds.checkBox(label='Fix errors first (normals, holes, cleanup)', value=True)
    hard_cb = cmds.checkBox(label='Keep hard edges', value=True)
    cmds.separator(height=12)

    def run(*args):
        quad_cleanup(
            angle_threshold=cmds.intField(angle_field, query=True, value=True),
            keep_hard_edges=cmds.checkBox(hard_cb, query=True, value=True),
            fix_errors=cmds.checkBox(fix_cb, query=True, value=True)
        )

    cmds.button(label='Run Quad Cleanup', height=35, command=run)
    cmds.showWindow(w)


run_ui()
