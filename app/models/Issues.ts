import { Instance, types } from "mobx-state-tree"

/**
 * REST API endpoints for issues
 * https://docs.github.com/en/rest/issues/issues
 */

export const LabelModel = types.model("ItemModel").props({
  id: types.identifierNumber,
  node_id: types.string,
  name: types.string,
})

export const ItemModel = types.model("ItemModel").props({
  node_id: types.identifier,
  id: types.number,
  title: types.string,
  html_url: types.string,
  body: types.string,
  created_at: types.string,
  labels: types.optional(types.array(LabelModel), []),
})

export const IssuesModel = types.model("IssuesModel").props({
  total_count: types.number,
  incomplete_results: types.boolean,
  items: types.array(ItemModel),
})

export interface IItem extends Instance<typeof ItemModel> {}
export interface IIssues extends Instance<typeof IssuesModel> {}
