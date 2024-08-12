import CardCategories from "./Categories/Categories";
import RecipeCard from "./Recipes/RecipeCard";
import Recipes from "./Recipes/Recipes";

export default function Home(){
    return(
        <>
            <div className="container box my-5 mx-5">
                <h2 className="title">...que vamos a hacer hoy?</h2>
                <CardCategories/>
            </div>
            <div className="container box my-5 mx-5">
                <h2 className="title">La mas visitadas</h2>
                <Recipes
                    urlPath={"/reciperover/recipes/?ordering=-view_count&page_size=5"}
                />
            </div>
            
        </>
    );
};