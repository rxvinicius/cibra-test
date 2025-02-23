export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export interface UserFormData {
  name: string;
  email: string;
  photo?: File;
}
