import {StepNames, ViewComponent, WizzardState} from "../StateMachineWizzard.tsx";

export const StepConfirmation: ViewComponent<WizzardState, StepNames> = ({state}) => {

    return (
        <div>
            <p>{state.name} is {state.age} years old</p>
        </div>
    )
}