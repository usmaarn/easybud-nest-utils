import { Controller, Get, Query } from "@nestjs/common";
import { MapService } from "./map.service";

@Controller()
export class MapController {
	constructor(private readonly mapService: MapService){}

	@Get("/locations/search")
	async searchLocation(@Query("q") searchQuery: string){
		const result = await this.mapService.searchLocation(searchQuery);
		return {data: result};
	}
}
