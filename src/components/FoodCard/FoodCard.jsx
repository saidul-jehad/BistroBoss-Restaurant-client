
const FoodCard = ({ item }) => {
    const { name, price, image, recipe } = item

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute top-4 right-4 bg-slate-900 text-white  px-3 rounded-md">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4  hover:text-orange-400 bg-slate-100 text-orange-400"> Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;