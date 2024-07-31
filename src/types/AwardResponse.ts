import { Award } from '@/types/Award'

export type AwardResponse = {
  awards: Award[]
  is_last_page: boolean
  page: number
  total_pages: number
}
