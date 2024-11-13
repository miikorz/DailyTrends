export interface Feed {
  id: string,
  title: string,
  subtitle: string | null,
  description: string,
  author: string,
  link: string,
  portrait: string | null,
  newsletter: string
}