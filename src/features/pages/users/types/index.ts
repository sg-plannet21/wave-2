export interface User {
  url: string;
  id: number;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: Date;
  is_cc_user: boolean;
  is_wave_superuser: boolean;
  business_unit_roles: number[];
  current_business_unit_roles: number[];
}
