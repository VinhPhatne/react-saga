import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork,
} from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    console.log(result);
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      })
    );
  } catch (e) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to get the users",
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* deleteUser({userId}) {
  try {
    yield call(api.deleteUser, userId);

    console.log("deleted user successfully");

    //yield call(getUsers);

  } catch (e) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to delete the user",
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId,
    });
  }
}

function* createUser(action) {
  try {
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    });
    //yield put(actions.getUsersRequest());
    //yield call(getUsers);
    console.log("created user successfully");
  } catch(e){
    yield put(actions.usersError({
        error: 'An error occurred when trying to create the user'
    }));
}
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

export default userSagas;
