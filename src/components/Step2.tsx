import {StepNames, ViewComponent, WizzardState} from "../StateMachineWizzard.tsx";

export const Step2: ViewComponent<WizzardState, StepNames> = ({state, setState}) => {

    if (!setState) return;

    return (
        <div>
            <input
                type="number"
                value={state.age}
                onChange={(e) => setState((prev) => ({...prev, age: parseInt(e.target.value)}))}
                placeholder="Your Age"
            />
        </div>
    )
}