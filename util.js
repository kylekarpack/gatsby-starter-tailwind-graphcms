const slugify = (item) => {
	let slug = item.slug || "";
	let parents = JSON.parse(JSON.stringify(item.parents || item.categories));
	while (parents?.[0]) {
		slug = `${parents[0].slug}/${slug}`;
		parents[0] = parents[0].parents?.[0] || parents[0].categories?.[0];
	}
	return slug;
};

module.exports = {
	slugify
};
