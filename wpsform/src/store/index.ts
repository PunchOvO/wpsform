import { createStore } from "vuex";
import { IUser, IForm, IProblem } from "../types/types";
import user from "./user";
import form from "./form";
import problem from "./problem";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { form, problem, user },
});
