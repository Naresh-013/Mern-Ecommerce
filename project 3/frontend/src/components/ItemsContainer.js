import Item from "./Item";
import { PRODUCT, HELP,ABOUT, SUPPORT } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={PRODUCT} title="PRODUCT" />
      <Item Links={HELP} title="HELP" />
      <Item Links={ABOUT} title="ABOUT" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;