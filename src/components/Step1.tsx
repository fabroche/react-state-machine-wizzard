import {StepNames, ViewComponent, WizzardState} from "../StateMachineWizzard.tsx";

export const Step1: ViewComponent<WizzardState, StepNames> = ({state, setState}) => {

    if (!setState) return;

    return (
        <div>
            <input
                type="text"
                value={state.name}
                onChange={(e) => setState((prev) => ({...prev, name: e.target.value}))}
                placeholder="Full Name"
            />
        </div>
    )
}