export const getAllPokemon = async (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

export const getPokemon = async (url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await fetch(url);
			const data = await res.json();
			// speciesエンドポイントで日本語名など取得
			const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
			const speciesData = await speciesRes.json();
			// 日本語名
			const jaNameObj = speciesData.names.find(n => n.language.name === 'ja');
			data.ja_name = jaNameObj ? jaNameObj.name : data.name;
			// 日本語タイプ
			data.ja_types = await Promise.all(
				data.types.map(async (typeObj) => {
					const typeRes = await fetch(typeObj.type.url);
					const typeData = await typeRes.json();
					const jaTypeObj = typeData.names.find(n => n.language.name === 'ja');
					return jaTypeObj ? jaTypeObj.name : typeObj.type.name;
				})
			);
			// 日本語アビリティ
			data.ja_abilities = await Promise.all(
				data.abilities.map(async (abObj) => {
					const abRes = await fetch(abObj.ability.url);
					const abData = await abRes.json();
					const jaAbObj = abData.names.find(n => n.language.name === 'ja');
					return jaAbObj ? jaAbObj.name : abObj.ability.name;
				})
			);
			resolve(data);
		} catch (e) {
			reject(e);
		}
	});
};