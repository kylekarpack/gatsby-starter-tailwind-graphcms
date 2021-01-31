const fetch = require("node-fetch");
const fs = require("fs");
const matter = require("gray-matter");
const SlateTransformer = require("@accordproject/markdown-slate")
	.SlateTransformer;

require("dotenv").config();

const assets = [
	{
		id: "ckkdbdx002n6p0a76i2zamm9q",
		fileName: "kaleb.jpg"
	},
	{
		id: "ckkdbdx002n6x0a762li6ogdp",
		fileName: "nicole.jpg"
	},
	{
		id: "ckkdbdx002nl00a72p08akp9g",
		fileName: "jeff.jpg"
	},
	{
		id: "ckkdbdx002nl70a72vmu93izx",
		fileName: "bob.jpg"
	},
	{
		id: "ckkdbdx002nlf0a72n6ocjz6s",
		fileName: "colin.jpg"
	},
	{
		id: "ckkdbdx002np40a79ux6l4mm2",
		fileName: "sarah.jpg"
	},
	{
		id: "ckkdbdx002npc0a79t6hjns47",
		fileName: "chris.jpg"
	},
	{
		id: "ckkdbdx002npk0a79iqj179dm",
		fileName: "larry.jpg"
	},
	{
		id: "ckkdbdx002nxz0c80xsks9rox",
		fileName: "marissa.jpg"
	},
	{
		id: "ckkdbdx002ny60c8092dawngm",
		fileName: "dan.jpg"
	},
	{
		id: "ckkdbdx002nyf0c80qrywfjet",
		fileName: "chris-meder.jpg"
	},
	{
		id: "ckkdbdx002nym0c80n0iiqgtq",
		fileName: "tim.jpg"
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
		mutation ($data: PageCreateInput!) {
			createPage(data: $data) {
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
		.readdirSync("../content/pages/services")
		.filter((el) => el.endsWith("md") || el.endsWith("mdx"))
	for (let item of items) {
		const str = fs.readFileSync(`../content/pages/services/${item}`).toString();
		const parsed = matter(str);
		const slateTransformer = new SlateTransformer();
		const slateValue = slateTransformer.fromMarkdown(parsed.content);
		const doc = slateValue.document;

		// if (parsed.data.status === "publish") {
		// 	continue;
		// }

		const data = {
			slug: parsed.data.slug,
			title: parsed.data.title,
			content: doc,
			// categories: {
			// 	connect: parsed.data.categories.map((el) => {
			// 		return {
			// 			slug: el.replace(/ /g, "-").replace("&", "and").toLowerCase()
			// 		};
			// 	})
			// }
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
		} catch (e) {
			console.log("FAILED", data);
			console.warn(e);
		}
	}
})();
