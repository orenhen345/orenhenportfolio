"""
Maya Auto Retopology Script
Creates NEW mesh - same shape, quad topology. Original stays unchanged.

USAGE: SELECT mesh object(s) first, then click Run.
"""

import maya.cmds as cmds


def get_all_mesh_transforms():
    meshes = cmds.ls(type='mesh')
    transforms = set()
    for m in meshes:
        parents = cmds.listRelatives(m, parent=True)
        if parents:
            transforms.add(parents[0])
    return list(transforms)


def get_target_objects():
    selected = cmds.ls(selection=True, type='transform')
    meshes = []
    for obj in selected:
        shapes = cmds.listRelatives(obj, shapes=True, type='mesh') or []
        if shapes:
            meshes.append(obj)
    return meshes


def auto_retopology(target_face_count=5000, symmetry=False, preserve_hard_edges=True):
    version = int(cmds.about(version=True).split()[0])
    if version < 2018:
        cmds.warning("Requires Maya 2018+")
        return None

    targets = get_target_objects()
    if not targets:
        cmds.warning("Nothing selected. SELECT mesh object(s) first.")
        return None

    cmds.makeLive(none=True)
    result_objects = []

    for target in targets:
        try:
            cmds.select(target, replace=True)
            dup = cmds.duplicate(returnRootsOnly=True)
            if not dup:
                continue
            work_obj = dup[0]
            cmds.select(work_obj, replace=True)

            retopo_result = cmds.polyRetopo(
                work_obj,
                targetFaceCount=target_face_count,
                targetFaceCountTolerance=10,
                symmetry=symmetry,
                preserveHardEdges=preserve_hard_edges,
                topologyRegularity=0.5,
                anisotropy=0.5
            )

            if retopo_result:
                transforms_before = {target, work_obj}
                transforms_after = set(get_all_mesh_transforms())
                new_transforms = [t for t in (transforms_after - transforms_before)
                                 if cmds.objExists(t) and t not in targets]
                if new_transforms:
                    result_objects.extend(new_transforms)
                    for ro in new_transforms:
                        try:
                            cmds.delete(ro, constructionHistory=True)
                        except Exception:
                            pass
                else:
                    result_objects.append(work_obj)
                    try:
                        cmds.delete(work_obj, constructionHistory=True)
                    except Exception:
                        pass

        except Exception as e:
            cmds.warning("Error on {}: {}".format(target, str(e)))

    if result_objects:
        cmds.select(result_objects, replace=True)
        for i, obj in enumerate(result_objects):
            try:
                result_objects[i] = cmds.rename(obj, "retopoResult{}".format(i + 1))
            except Exception:
                pass
        cmds.select(result_objects, replace=True)
        cmds.confirmDialog(title='Done', message='Created {} new quad mesh(es).'.format(len(result_objects)))

    return result_objects


def run_retopology_ui():
    window_name = 'autoRetopoWindow'
    if cmds.window(window_name, exists=True):
        cmds.deleteUI(window_name)

    window = cmds.window(window_name, title='Auto Retopology', width=320)
    cmds.columnLayout(adjustableColumn=True, rowSpacing=8, columnOffset=('both', 10))

    cmds.text(label='STEP 1: SELECT mesh object(s) to retopologize')
    cmds.text(label='STEP 2: Set options and click Run')
    cmds.separator(height=10)

    cmds.text(label='Target face count:', align='left')
    face_field = cmds.intField(value=5000, minValue=100, maxValue=100000, step=100)
    symmetry_cb = cmds.checkBox(label='Symmetry', value=False)
    hard_edges_cb = cmds.checkBox(label='Preserve hard edges', value=True)
    cmds.separator(height=10)

    def run_cb(*args):
        auto_retopology(
            target_face_count=cmds.intField(face_field, query=True, value=True),
            symmetry=cmds.checkBox(symmetry_cb, query=True, value=True),
            preserve_hard_edges=cmds.checkBox(hard_edges_cb, query=True, value=True)
        )

    cmds.button(label='Run Retopology', height=35, command=run_cb)
    cmds.showWindow(window)


run_retopology_ui()
