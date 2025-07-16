import "./Card.css";

const Card = ({ pokemon }) => {
	return (
		<div className="card">
			{/* 画像 */}
			<div className="cardImg">
				<img src={pokemon.sprites.front_default} />
			</div>
			{/* 日本語名 */}
			<h3 className="cardName">{pokemon.ja_name}</h3>
			{/* 日本語タイプ */}
			<div className="cardTypes">
				{pokemon.ja_types && pokemon.ja_types.map((type, i) => (
					<div key={i}>
						<span className="typeName">{type}</span>
					</div>
				))}
			</div>
			{/* カード情報 */}
			<div className="cardInfo">
				<div className="cardData">
					<p className="title">重さ: {pokemon.weight/10} kg</p>
				</div>
				<div className="cardData">
					<p className="title">高さ: {pokemon.height/10} m</p>
				</div>
				<div className="cardData">
					<p className="title">アビリティ: {pokemon.ja_abilities && pokemon.ja_abilities.join(', ')}</p>
				</div>
			</div>
		</div>
	)
}

export default Card
