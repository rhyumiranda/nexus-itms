/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text730983700",
    "max": 0,
    "min": 0,
    "name": "task_description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1084875215",
    "maxSelect": 1,
    "name": "task_status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Not started",
      "In Progress",
      "Completed"
    ]
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select577123947",
    "maxSelect": 1,
    "name": "task_priority",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Low",
      "Medium",
      "High",
      "Urgent"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text730983700",
    "max": 0,
    "min": 0,
    "name": "task_description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

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

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select577123947",
    "maxSelect": 1,
    "name": "task_priority",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "Low",
      "Medium",
      "High",
      "Urgent"
    ]
  }))

  return app.save(collection)
})
