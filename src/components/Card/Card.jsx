const Card = ({ pokemon }) => {
	return (
		// ポケモンのカードコンポーネント
		<div className="card">

			{/* 画像 */}
			<div className="cardImg">
				<img src={pokemon.sprites.front_default} />
			</div>

			{/* 名前 */}
			<h3 className="cardName">{pokemon.name}</h3>

			{/* タイプ */}
			<div className="cardTypes">
				{pokemon.types.map((type, i) => {
					return (
						<div key={i}>
							<span className="typeName" key={i}>
								{type.type.name}
							</span>
						</div>
					);
				})}
			</div>

			{/* カード情報 */}
			<div className="cardInfo">
				<div className="cardData">
					<p className="title">重さ:{pokemon.weight}</p>
				</div>
				<div className="cardData">
					<p className="title">高さ:{pokemon.height}</p>
				</div>
				<div className="cardData">
					<p className="title">アビリティ:{pokemon.abilities[0].ability.name}</p>
				</div>
			</div>

		</div>
	)
}

export default Card
