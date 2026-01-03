type Application = {
  id: string
  name: string
}

export type ApplicationsResponse = {
  apps: Application[]
  totalCount: number
}
