export interface Route {
  url: string;
  route_id: string;
  route_name: string;
  destination: string;
  system_created: boolean;
  business_unit: string;
  destination_type: string;
  call_tag: string;
}

export interface RouteDestinationType {
  url: string;
  destination_type_id: string;
  destination_type: string;
  system_created: boolean;
}
