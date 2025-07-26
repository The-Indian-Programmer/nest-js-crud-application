export const returnSuccess = (message: string, code: number, data: any) => {
    return { status: "success", message, code, data };
}

export const returnError = (message: string, code: number) => {
    return { status: "error", message, code };
}