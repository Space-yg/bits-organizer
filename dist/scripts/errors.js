import { organizationTable, bitsTbody } from "./globals.js";
/** A list of errors */
const errorsList = document.getElementById("errors");
/**
 * Checks for errors in the organization table
 * @returns The error messages if there are any
 */
function checkOverlapsInOrganizationTable() {
    const errors = [];
    let lastBitInPre = -1;
    let nameInPre = "";
    for (const tr of organizationTable.tBodies[0].rows) {
        const nameInput = tr.cells[2].firstElementChild;
        const startBitInput = tr.cells[3].firstElementChild;
        if (lastBitInPre >= +startBitInput.value) {
            errors.push(`"${nameInPre}" is overlapping with "${nameInput.value}".`);
        }
        const lengthInput = tr.cells[4].firstElementChild;
        lastBitInPre = +startBitInput.value + +lengthInput.value - 1;
        nameInPre = nameInput.value;
    }
    return errors;
}
/**
 * Check if there are enough bits to highlight
 * @returns The error messages if there are any
 */
function checkForEnoughBits() {
    const errors = [];
    for (const tr of organizationTable.tBodies[0].rows) {
        const lastBit = +tr.cells[3].firstElementChild.value + +tr.cells[4].firstElementChild.value;
        if (lastBit > bitsTbody.rows.length * 8) {
            const nameInput = tr.cells[2].firstElementChild;
            errors.push(`There are not enough bits for "${nameInput.value}".`);
        }
    }
    return errors;
}
/**
 * Check if the start bit is valid
 * @returns The error messages if there are any
 */
function checkValidStartBit() {
    const errors = [];
    for (const tr of organizationTable.tBodies[0].rows) {
        if (+tr.cells[3].firstElementChild.value < 0) {
            const nameInput = tr.cells[2].firstElementChild;
            errors.push(`"${nameInput.value}"'s start bit cannot be less than 0.`);
        }
    }
    return errors;
}
/**
 * Checks for errors
 */
export function checkErrors() {
    // Reset errors
    errorsList.innerHTML = "";
    // Combine all errors
    const errors = [
        ...checkValidStartBit(),
        ...checkOverlapsInOrganizationTable(),
        ...checkForEnoughBits(),
    ];
    // Add errors to list
    let li;
    for (const error of errors) {
        li = document.createElement("li");
        li.innerText = error;
        errorsList.appendChild(li);
    }
    // If there are no errors
    if (errors.length === 0) {
        li = document.createElement("li");
        li.innerText = "No errors found!";
        errorsList.appendChild(li);
    }
}
//# sourceMappingURL=errors.js.map