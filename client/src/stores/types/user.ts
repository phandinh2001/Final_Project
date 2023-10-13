export interface UserState {
  isLoggedIn: boolean;
  username: null | string;
  phone: null | string;
  isAdmin: boolean;
  avatar: null | string;
}

export interface Login {
  phone: string;
  password: string;
  success: (url: string) => void;
}

export interface LoginSuccess {
  username: string;
  phone: string;
  position: string;
  avatar: string;
}

export interface ChangeName {
  phone: string;
  newName: string;
}

export interface GetMe {
  onErr: () => void;
}
