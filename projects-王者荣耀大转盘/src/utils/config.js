// import Comdeng_lu from "../components/Comdeng_lu/Comdeng_lu.jsx";
import ComRule from "../components/Rule/rule.jsx";
// import ComGameClear from "../components/ComGameClear/ComGameClear.jsx";
// import ComGameFailed from "../components/ComGameFailed/ComGameFailed.jsx";
// import ComGameFinalClear from "../components/ComGameFinalClear/ComGameFinalClear.jsx";
// import ComgetPoints from "../components/ComgetPoints/ComgetPoints.jsx";
// import ComnoChance from "../components/ComnoChance/ComnoChance.jsx";
// import ComspendPoints from "../components/ComspendPoints/ComspendPoints.jsx";
// import ComspendPointsSure from "../components/ComspendPointsSure/ComspendPointsSure.jsx";
// import ComNoPrize from "../components/ComNoPrize/ComNoPrize.jsx";

const {
    default: Enum
} = require("./enum");

let comMap = new Map();

// comMap.set(Enum.Com.Comdeng_lu, Comdeng_lu);
// comMap.set(Enum.Com.ComGameClear, ComGameClear);
// comMap.set(Enum.Com.ComGameFailed, ComGameFailed);
// comMap.set(Enum.Com.ComGameFinalClear, ComGameFinalClear);
// comMap.set(Enum.Com.ComgetPoints, ComgetPoints);
// comMap.set(Enum.Com.ComnoChance, ComnoChance);
comMap.set(Enum.Com.ComRule, ComRule);
// comMap.set(Enum.Com.ComspendPoints, ComspendPoints);
// comMap.set(Enum.Com.ComspendPointsSure, ComspendPointsSure);
// comMap.set(Enum.Com.ComNoPrize, ComNoPrize)
const config = {
    comMap: comMap,
    netError: "网络异常，请稍后重试"
}
export default config