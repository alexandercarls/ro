type SignNr = string

export type SignVdh = {
  nr: string
  name: string
  description: string
  type: string
  combination?: Array<SignNr>
  isSenior?: boolean
  inFront?: boolean
}
