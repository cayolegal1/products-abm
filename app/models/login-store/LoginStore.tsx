import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {withEnvironment} from "../extensions/with-environment";
import {withRootStore} from "../extensions/with-root-store";

/**
 * Model description here for TypeScript hints.
 */
export const LoginStoreModel = types
  .model("LoginStore")
  .extend(withRootStore)
  .extend(withEnvironment)
  .props({
    
    id: types.maybeNull(types.number),
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    username: types.maybeNull(types.string),
    password: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    is_staff: types.maybeNull(types.boolean),
    profile_picture: types.maybeNull(types.string),
    token: types.maybeNull(types.string),

  })
  .views(self => ({
    get isLoggedIn() {
      return self.token !== null && self.token !== undefined
    },
    get fullName() {
      return self.first_name + ' ' + self.last_name
    },

  }))
  .actions(self => ({
    setApiToken(token: string | null) {
      const api = self.environment.api.apisauce
      self.token = token
      if (token) {
        api?.setHeader('Authorization', 'JWT ' + token)
      } else {
        api?.deleteHeader('Authorization')
      }
    },
    setUser(userData: any) {
      const user = userData
      self.id = user.id
      self.first_name = user.first_name
      self.last_name = user.last_name
      self.email = user.email
      self.username = user.username

    },
    reset() {
      const api = self.environment.api.apisauce
      api?.deleteHeader('Authorization')
      self.id = null
      self.first_name = null
      self.last_name = null
      self.email = null
      self.username = null
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type LoginStoreType = Instance<typeof LoginStoreModel>

export interface LoginStore extends LoginStoreType {
}

type LoginStoreSnapshotType = SnapshotOut<typeof LoginStoreModel>

export interface LoginStoreSnapshot extends LoginStoreSnapshotType {
}