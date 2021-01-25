const fetch = require("node-fetch");
const fs = require("fs");
const matter = require("gray-matter");
const SlateTransformer = require("@accordproject/markdown-slate")
	.SlateTransformer;

require("dotenv").config();

const assets = [
	{
		id: "ckkc81w5c88et0a84sdm2wb1v",
		fileName: "factoria.jpg"
	},
	{
		id: "ckkc81w5c88f20a84nyqkuyo1",
		fileName: "12-009-Andrews-Creek-Culvert-at-Snow-Creek-Road.jpg"
	},
	{
		id: "ckkc81w5c88ga09719xy4l1vi",
		fileName: "padilla.png"
	},
	{
		id: "ckkc81w5c88gk0971b00conbo",
		fileName: "lowerCedar.jpg"
	},
	{
		id: "ckkc81w5c88gr09710uxg5gxe",
		fileName: "Green-River-Flooding-Nov-2006.jpg"
	},
	{
		id: "ckkc81w5c890m0a24ga39qmfx",
		fileName: "canyon.jpg"
	},
	{
		id: "ckkc81w5c890t0a24885a12p8",
		fileName: "lewis-operations1.png"
	},
	{
		id: "ckkc81w5c898q0a738z3ew3td",
		fileName: "monroe.jpg"
	},
	{
		id: "ckkc81w5c898u0a73ydlf0as7",
		fileName:
			"12-017-Middle-Fork-Snoqualmie-River-Hydraulic-Modeling-and-Analysis.jpg"
	},
	{
		id: "ckkc81wx488fc0a843ag97wkr",
		fileName: "11-007-Bear-Creek-Bridge-Protection-Emergency-Permitting.jpg"
	},
	{
		id: "ckkc81wx488fo0a84cka7zq0h",
		fileName: "japp.jpg"
	},
	{
		id: "ckkc81wx488fw0a84odm0yzbz",
		fileName: "ElmaPorter.jpg"
	},
	{
		id: "ckkc81wx488g30a844qie5sra",
		fileName: "CurrierCr.jpg"
	},
	{
		id: "ckkc81wx488ga0a84tisvmk2b",
		fileName: "hunter.jpg"
	},
	{
		id: "ckkc81wx488gh0a84auxgdd9q",
		fileName: "chehalis-floodplain.jpg"
	},
	{
		id: "ckkc81wx488go0a84b1wxythw",
		fileName: "ColockumCreek.jpg"
	},
	{
		id: "ckkc81wx488gr0a84ezeaa6kc",
		fileName: "kittitas.jpg"
	},
	{
		id: "ckkc81wx488h20971po9nt0al",
		fileName: "12-008-Dry-Creek-Bridge-Replacement-Hydraulic-Design.jpg"
	},
	{
		id: "ckkc81wx488h20a8481zvrxv6",
		fileName: "eugene.jpg"
	},
	{
		id: "ckkc81wx488h90a8469yts9hf",
		fileName: "NaneumWilsonCherry.jpg"
	},
	{
		id: "ckkc81wx488hc0971ekoh6o05",
		fileName: "HighCreek.jpg"
	},
	{
		id: "ckkc81wx488hl0971dydf8nlu",
		fileName: "cc1.jpg"
	},
	{
		id: "ckkc81wx488hs0971h8jkwg57",
		fileName: "12-003-Musser-Creek-and-Teanaway-Road-Flooding.jpg"
	},
	{
		id: "ckkc81wx488hx0971de5gfjm6",
		fileName: "filbert-channel1.jpg"
	},
	{
		id: "ckkc81wx488i4097162n5r65x",
		fileName: "mf-1.jpg"
	},
	{
		id: "ckkc81wx488ib09714kmjmyta",
		fileName: "12-022-Chikamin-Creek-Bridge-Replacement.jpg"
	},
	{
		id: "ckkc81wx488ij0971ffy4cz9f",
		fileName: "bridgescour.jpg"
	},
	{
		id: "ckkc81wx488io0971lhi9rahd",
		fileName: "green-river.jpg"
	},
	{
		id: "ckkc81wx489180a24mw4vksyw",
		fileName:
			"11-026-Manastash-Creek-Post-Flood-Investigation-and-Flood-Relief-Alternatives.jpg"
	},
	{
		id: "ckkc81wx4891g0a246yprkur5",
		fileName: "cc-sediment.jpg"
	},
	{
		id: "ckkc81wx4891n0a247fvtus7t",
		fileName: "11-008-LaPianta-Development.jpg"
	},
	{
		id: "ckkc81wx4891u0a24wj9ek9ps",
		fileName: "Holden.jpg"
	},
	{
		id: "ckkc81wx489210a24hcwv59mw",
		fileName: "mckenzie.jpg"
	},
	{
		id: "ckkc81wx489280a242mdji2i8",
		fileName: "cascade-2.jpg"
	},
	{
		id: "ckkc81wx4892f0a24vfv1hkwb",
		fileName: "12-020-Honolulu-Light-Rail-Pearl-Highlands.jpg"
	},
	{
		id: "ckkc81wx4892j0a241let6hy1",
		fileName: "bothell.jpg"
	},
	{
		id: "ckkc81wx4892q0a24lzubqfff",
		fileName: "filbert-channel.jpg"
	},
	{
		id: "ckkc81wx489300a240pbyq18d",
		fileName: "LonesTurley2.jpg"
	},
	{
		id: "ckkc81wx4899d0a73mlk4vx76",
		fileName: "20191207_111106-min-min.jpg"
	},
	{
		id: "ckkc81wx4899n0a73wahakka3",
		fileName: "NFSnoqualmieBridge.jpg"
	},
	{
		id: "ckkc81wx4899u0a730dqycml9",
		fileName: "emergency.jpg"
	},
	{
		id: "ckkc81wx489a10a733rk1ln38",
		fileName: "12-018-White-River-at-Countyline-CLOMR.jpg"
	},
	{
		id: "ckkc81wx489a80a738zqkce96",
		fileName: "12-004-Upper-Hoh-River-Road-Fish-Culverts.jpg"
	},
	{
		id: "ckkc81wx489ac0a73mzgfs6ze",
		fileName: "12-013-Eastbank-Esplanade-Fire-Dock.jpg"
	},
	{
		id: "ckkc81wx489ak0a73y4xmm101",
		fileName: "lewis.png"
	},
	{
		id: "ckkc81wx489at0a73g1pa7boo",
		fileName: "12-021-Blue-Creek-Bridge-Sediment.jpg"
	},
	{
		id: "ckkc81wx489b00a73bfmo247u",
		fileName: "hart.jpg"
	},
	{
		id: "ckkc81xow89b70a739c64mgdi",
		fileName:
			"12-016-Manastash-Creek-Fish-Habitat-Enhancement-Flood-Hazard-Management-Corridor-Plan.jpg"
	},
	{
		id: "ckkc81xow89be0a73bm8bqns0",
		fileName: "clark.jpg"
	},
	{
		id: "ckkc81xow89bh0a73o0krzlee",
		fileName: "InnisCreek.jpg"
	},
	{
		id: "ckkc83l3s88jw0a84mzwhnsoh",
		fileName: "NFSwift.jpg"
	},
	{
		id: "ckkc83l3s88k30a84panp8j5f",
		fileName: "tahuya.jpg"
	},
	{
		id: "ckkc83l3s88kd0a84pzgvygzs",
		fileName: "viaKachess.jpg"
	},
	{
		id: "ckkc83l3s88ki0a84wg7msj9t",
		fileName: "Tolt.jpg"
	},
	{
		id: "ckkc83l3s88kr0a84ywvddwon",
		fileName: "vashon-maury.jpg"
	},
	{
		id: "ckkc83l3s88kz0a84vew22zy2",
		fileName: "WDFWguidelines.jpg"
	},
	{
		id: "ckkc83l3s88l70971cgbv7e22",
		fileName: "RingerLoop.jpg"
	},
	{
		id: "ckkc83l3s88ld09710d13zkvi",
		fileName: "YakimaR.jpg"
	},
	{
		id: "ckkc83l3s88lm09711obnpxf4",
		fileName: "potter.jpg"
	},
	{
		id: "ckkc83l3s88lt09710x2jlok1",
		fileName: "spokane-river.jpg"
	},
	{
		id: "ckkc83l3s88m409719veueg3h",
		fileName: "seward2.jpg"
	},
	{
		id: "ckkc83l3s88mb0971s1601z53",
		fileName: "SnohomishMDP.jpg"
	},
	{
		id: "ckkc83l3s88mi0971ks1kqge5",
		fileName: "Redmond-Ridge-Northridge-Layout.jpg"
	},
	{
		id: "ckkc83l3s88mn0971ralrua7f",
		fileName: "puyallupBridge.jpg"
	},
	{
		id: "ckkc83l3s895z0a244dprngn5",
		fileName: "Puyallup-River-Flood-Studies.jpg"
	},
	{
		id: "ckkc83l3s89670a24780g7jnw",
		fileName: "san-joaqin.jpg"
	},
	{
		id: "ckkc83l3s896h0a24hyep06ln",
		fileName: "nooksack.jpg"
	},
	{
		id: "ckkc83l3s896p0a24fzh2qao5",
		fileName: "penstock.jpg"
	},
	{
		id: "ckkc83l3s89e20a73wup43jk9",
		fileName: "sqaulicum2.jpg"
	},
	{
		id: "ckkc83l3s89ea0a73ow7tw6xy",
		fileName: "NShoreLevee.jpg"
	},
	{
		id: "ckkc83l3s89ej0a7311jp07yh",
		fileName: "viva.jpg"
	},
	{
		id: "ckkc83l3s89er0a73d8qls0lv",
		fileName: "TeanawayR.jpg"
	},
	{
		id: "ckkc83l3s89ez0a733tcp2ypd",
		fileName: "tools.jpg"
	},
	{
		id: "ckkc83l3s89f60a73q0ec0gox",
		fileName: "TenMile.jpg"
	},
	{
		id: "ckkc83l3s89fd0a73p75po3nl",
		fileName: "North-Creek-Levee-Accreditation.jpg"
	},
	{
		id: "ckkc83lvk896w0a24ef2g3pqu",
		fileName: "willamette.jpg"
	},
	{
		id: "ckkc83lvk89730a24bjgs0vxk",
		fileName: "Satsop-River-Flood-Plain-Phase2a.jpg"
	},
	{
		id: "ckkc83lvk897a0a24j5vntyh2",
		fileName: "TenMile copy.jpg"
	}
];

async function fetchAPI(query, { variables, preview } = {}) {
	const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${
				preview
					? process.env.GRAPHCMS_DEV_AUTH_TOKEN
					: process.env.GRAPHCMS_PROD_AUTH_TOKEN
			}`
		},
		body: JSON.stringify({
			query,
			variables
		})
	});
	const json = await res.json();

	if (json.errors) {
		console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
		console.error(json.errors);
		throw new Error("Failed to fetch API");
	}

	return json.data;
}

async function createItem(vars) {
	const out = await fetchAPI(
		`
		mutation ($data: PortfolioCreateInput!) {
			createPortfolio(data: $data) {
			  id
			}
		 }
  `,
		{
			variables: {
				data: vars.data
			}
		}
	);
	return out.id;
}

(async function () {
	let items = fs
		.readdirSync("../content/pages/portfolio")
		.filter((el) => el.endsWith("md") || el.endsWith("mdx"));
	for (let item of items) {
		const str = fs
			.readFileSync(`../content/pages/portfolio/${item}`)
			.toString();
		const parsed = matter(str);
		const slateTransformer = new SlateTransformer();
		const slateValue = slateTransformer.fromMarkdown(parsed.content);
		const doc = slateValue.document;

		if (parsed.data.status === "publish") {
			continue;
		}

		const data = {
			slug: parsed.data.slug,
			title: parsed.data.title,
			body: doc,
			categories: {
				connect: parsed.data.categories.map((el) => {
					return {
						slug: el.replace(/ /g, "-").replace("&", "and").toLowerCase()
					};
				})
			}
		};

		if (parsed.data.order) {
			data.order = parsed.data.order;
		}

		if (parsed.data.featuredImage) {
			const img = parsed.data.featuredImage.replace("./", "");
			let imgId = "";
			for (let asset of assets) {
				if (asset.fileName === img) {
					imgId = asset.id;
					break;
				}
			}
			if (imgId) {
				data.image = {
					connect: {
						id: imgId
					}
				};
			}
		}

		try {
			await createItem({
				data
			});
		} catch(e) {
			console.log("FAILED", parsed.data);
		}
	
	}
})();
