import { ICell } from "../../models";
import { CellCoordinates } from "../../types";

export interface IChangeCellColorPayload extends ICell {
}

export interface IChangeCellOpacityPayload {
    position: CellCoordinates,
    opacity: number
}

export interface IHoveredCell extends ICell {

}