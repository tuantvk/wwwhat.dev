import axios from "axios"
import { Instance, types, flow, cast } from "mobx-state-tree"
import { API_GITHUB_SEARCH_ISSUES } from "@/constants/github"
import { bookmarksStorage, load, save } from "@/utils/storage"
import { IssuesModel, ItemModel, IIssues, IItem } from "./Issues"

export const IssuesStoreModel = types
  .model("IssuesStore")
  .props({
    issues: types.maybeNull(IssuesModel),
    bookmarks: types.map(types.reference(ItemModel)),
    state: types.optional(
      types.enumeration("State", ["pending", "done", "error"]),
      "pending",
    ),
  })
  .views((self) => ({
    get isLoading() {
      return self.state === "pending"
    },
  }))
  .actions((self) => ({
    fetchBookmarks() {
      const localBookmarks = load<IItem[]>(bookmarksStorage)
      if (localBookmarks && Array.isArray(localBookmarks)) {
        for (const bookmark of localBookmarks) {
          self.bookmarks.set(bookmark.node_id, ItemModel.create(bookmark))
        }
      }
    },
    toggleBookmark(item: IItem) {
      if (self.bookmarks.has(item.node_id)) {
        self.bookmarks.delete(item.node_id)
      } else {
        self.bookmarks.put(item)
      }
      save(bookmarksStorage, Array.from(self.bookmarks.values()))
    },
    fetchIssues: flow(function* fetchIssues(params = "") {
      self.state = "pending"
      try {
        const response = yield axios.get<IIssues>(
          `${API_GITHUB_SEARCH_ISSUES} ${params}`,
        )
        self.issues = response.data
        self.state = "done"
      } catch {
        self.state = "error"
      }
    }),
    loadMoreIssues: flow(function* loadMoreIssues(params = "", page = 1) {
      self.state = "pending"
      try {
        const response = yield axios.get<IIssues>(
          `${API_GITHUB_SEARCH_ISSUES} ${params}&page=${page}`,
        )
        self.issues = cast(
          Object.assign({}, self.issues, {
            items: [...(self.issues?.items || []), ...response.data.items],
          }),
        )
        self.state = "done"
      } catch {
        self.state = "error"
      }
    }),
    afterCreate() {
      this.fetchIssues()
      // FIXME: help wanted
      // this.fetchBookmarks()
    },
  }))

export interface IIssuesStore extends Instance<typeof IssuesStoreModel> {}

let _issuesStore: IIssuesStore

export const useIssuesStore = () => {
  if (!_issuesStore) {
    _issuesStore = IssuesStoreModel.create({})
  }

  return _issuesStore
}
