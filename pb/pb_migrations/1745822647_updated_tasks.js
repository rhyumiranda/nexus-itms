/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1084875215",
    "maxSelect": 1,
    "name": "task_status",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Not started",
      "In Progress",
      "Completed"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1084875215",
    "maxSelect": 1,
    "name": "task_status",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Not Started",
      "In Progress",
      "Completed"
    ]
  }))

  return app.save(collection)
})
