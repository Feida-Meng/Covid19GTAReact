import { MississaugaBoundary } from "./MississaugaBoundary";
import { BramptonBoundary } from "./BramptonBoundary";
import { TorontoBoundary } from "./TorontoBoundary";
import { CaledonBoundary } from "./CaledonBoundary";
import { AuroraBoundary } from "./AuroraBoundary";
import { EastGwillimburyBoundary } from "./EastGwillimburyBoundary";
import { GeorginaBoundary } from "./GeorginaBoundary";
import { KingBoundary } from "./KingBoundary";
import { MarkhamBoundary } from "./MarkhamBoundary";
import { NewmarketBoundary } from "./NewmarketBoundary";
import { RichmondhillBoundary } from "./RichmondhillBoundary";
import { VaughanBoundary } from "./VaughanBoundary";
import { WhitechurchStouffvilleBoundary } from "./WhitechurchStouffvilleBoundary";
import { PickeringBoundary } from "./PickeringBoundary"
import { AjaxBoundary } from "./AjaxBoundary";
import { WhitbyBoundary } from "./WhitbyBoundary";
import { OshawaBoundary } from "./OshawaBoundary";
import { ClaringtonBoundary } from "./ClaringtonBoundary";
import { UxbridgeBoundary } from "./UxbridgeBoundary";
import { ScugogBoundary } from "./ScugogBoundary";
import { BrockBoundary } from "./BrockBoundary";
import { BurlingtonBoundary } from "./BurlingtonBoundary";
import { HaltonHillsBoundary } from "./HaltonHillsBoundary";
import { MiltonBoundary } from "./MiltonBoundary";
import { OakvilleBoundary } from "./OakvilleBoundary";

export const cityBoundaries = {
	Mississauga: { boundary: MississaugaBoundary, latlng: { lat: 43.593629, lng: -79.648898 } },
	Brampton: { boundary: BramptonBoundary, latlng: { lat: 43.721375, lng: -79.733460 } },
	Toronto: { boundary: TorontoBoundary, latlng: { lat: 43.735523, lng: -79.354721 } },
	Caledon: { boundary: CaledonBoundary, latlng: { lat: 43.858524, lng: -79.879212 } },
	Aurora: { boundary: AuroraBoundary, latlng: { lat: 43.997807, lng: -79.444190 } },
	"East Gwillimbury": { boundary: EastGwillimburyBoundary, latlng: { lat: 44.140404, lng: -79.394134} },
	Georgina: { boundary: GeorginaBoundary, latlng: { lat: 44.261987, lng: -79.309176 }},
	King: { boundary: KingBoundary, latlng: { lat: 43.963526, lng: -79.608106 }},
	Markham: { boundary: MarkhamBoundary, latlng: { lat: 43.888077, lng: -79.283068 }},
	Newmarket: { boundary: NewmarketBoundary, latlng: { lat: 44.045906, lng: -79.458803 }},
	"Richmond Hill": { boundary: RichmondhillBoundary, latlng: { lat: 43.903548, lng: -79.422467 }},
	Vaughan: { boundary: VaughanBoundary, latlng: { lat: 43.837990, lng: -79.552903 }},
	"Whitchurch-Stouffville": { boundary: WhitechurchStouffvilleBoundary, latlng: { lat: 44.013889, lng: -79.313755 }},
	Pickering: { boundary: PickeringBoundary, latlng: { lat: 43.930758, lng: -79.113565 }},
	Ajax: { boundary: AjaxBoundary, latlng: { lat: 43.863877, lng: -79.023278 }},
	Whitby: { boundary: WhitbyBoundary, latlng: { lat: 43.932915, lng: -78.962164 }},
	Oshawa: { boundary: OshawaBoundary, latlng: { lat: 43.915555, lng: -78.864510 }},
	Clarington: { boundary: ClaringtonBoundary, latlng: { lat: 43.954955, lng: -78.620138 }},
	Uxbridge: { boundary: UxbridgeBoundary, latlng: { lat: 44.089213, lng:  -79.188918 }},
	Scugog: { boundary: ScugogBoundary, latlng: { lat: 44.089213, lng: -78.904646 }},
	Brock: { boundary: BrockBoundary, latlng: { lat: 44.337213, lng: -79.095493 }},
	Burlington: { boundary: BurlingtonBoundary, latlng: { lat: 43.387657, lng:  -79.830315 }},
	"Halton Hills": { boundary: HaltonHillsBoundary, latlng: { lat: 43.623986, lng: -79.932209 }},
	Milton: { boundary: MiltonBoundary, latlng: { lat: 43.499144, lng: -79.963731 }},
	Oakville: { boundary: OakvilleBoundary, latlng: { lat: 43.460322, lng: -79.716401 }},

};