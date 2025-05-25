import PlanForm from "../components/PlanForm";
import { useLocation } from "react-router-dom";

function AddPlan() {
  const location = useLocation();
  const plan = location.state?.plan  || null;
  const edit = plan !== null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col gap-6 z-2 ">
        <PlanForm initialPlan={plan} edit={edit}/>
    </div>
  );
}

export default AddPlan;
