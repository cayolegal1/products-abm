import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type ListResult = { kind: "ok"; data: any[] } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type SingleResult = { kind: "ok"; data: any } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type NoResponseGetResult = { kind: "ok" } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type NoResponsePostResult = { kind: "ok" } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type SimpleGetResult = { kind: "ok"; data: any } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type SimplePostResult = { kind: "ok"; response: any } | { kind: "bad-data"; errors: any } | GeneralApiProblem
export type GenericResponse = { kind: "ok"; } | { kind: "bad-data"; errors: any } | GeneralApiProblem