/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = @collection.tasks.task_userId"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = @collection.users.tasks_via_task_userId.id"
  }, collection)

  return app.save(collection)
})
