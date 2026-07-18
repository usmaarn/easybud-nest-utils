import { ConfigService } from '@/old/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapService {
  constructor(private readonly config: ConfigService) {}

  async searchLocation(query: string) {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        body: JSON.stringify({
          textQuery: query,
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.config.getOrThrow('google.map_api_key'),
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress',
        },
      },
    );

    const data = await response.json();
    return (
      data.places?.map((el) => ({
        placeId: el.id,
        description: el.displayName.text,
      })) ?? []
    );
  }
}
