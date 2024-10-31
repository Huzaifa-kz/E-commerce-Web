import FlashSales from "./FlashSales";
import { connact } from "react-redux";
import { Addtocard } from "./Addtocard";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product, quantity) => dispatch(Addtocard(product, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashSales);
