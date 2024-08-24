import { CardFetchResponse } from "../../types/card";

interface CardProps {
	card: CardFetchResponse;
}

const Card = ({ card }: CardProps) => {
	return (
		<div>
			<h5>{card.description}</h5>
			<p>Category: {card.category.name}</p>
		</div>
	);
};

export default Card;
