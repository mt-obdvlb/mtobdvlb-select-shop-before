export interface loginFormData {
  username: string;
  password: string;
}

export interface responseData {
  code: number,
  message: string,
  ok:boolean
}



export interface loginResponseData extends responseData{
  data: string,
}


export interface userInfoReponseData extends responseData{
  data: {
    router: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }

}