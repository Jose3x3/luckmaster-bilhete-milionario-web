import { CampaignResponse } from '@/types/CampaingResponse'
import { fetchWithBaseUrl } from '@/utils'

export async function getAllCampaignsByShareId(
  raffleId: string,
): Promise<CampaignResponse> {
  const response = await fetchWithBaseUrl(
    `/user/find/sharedcampaign/${raffleId}`,
    {
      method: 'GET',
      next: {
        revalidate: 180,
      },
    },
  )
  if (!response.ok) throw new Error('Failed to fetch data')
  return response.json()
}
