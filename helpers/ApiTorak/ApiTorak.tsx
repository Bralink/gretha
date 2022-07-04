import $ from 'jquery';

class ApiTorak {
    // public host?: string = process.env["REACT_APP_API_URL"];
    // public module?: string = process.env["REACT_APP_API_MODULE"];
    //public host?: string = 'https://api.grehta-capsulashipertension.com.mx';
    public host?: string = 'http://localhost/api_asecom';
    public module?: string = '/web';
    private controller: string = '';
    private action: string = '';
    private params: any = [];
    private url: string = '';
    private session: any = [];
    private notificationShow: boolean = false;
    private notificationMessage: string = "";

    

    getJSON = (controller: string, action: string = '', params: Array<any> = []) => {
        let sessionString: string = sessionStorage.getItem("sessionData") || '';
        let objectSession: any = {
            token: ""
        };

        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        }
        
        this.controller = controller;
        this.action = action;
        this.params = params;

        this.url = (this.host === undefined ? '' : this.host) + (this.module === undefined ? '' : this.module) + '/' + this.controller + '/' + this.action;
        this.url += "?token=" + objectSession.token;
        
        this.params.forEach((element: { field: string; value: string; }) => {
            this.url += "&" + element.field + '=' + element.value;
        });

        let response: any = fetch(this.url, {
            credentials: 'include'
        })
        .then((responseCall: any) => {
            let callBackResponse = responseCall.json();

            callBackResponse.then((response: any) => {
                if(!response.status){

                    if(response.error === -1){
                        sessionStorage.setItem("globalState", "");
                        window.location.reload();
                    }

                    this.notificationMessage = /*`Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action}),*/` error: ${response.error}`;
                    this.notificationShow = true;
    
                    $("html, body").animate({ scrollTop: 0 }, "slow");
    
                    let mensaje: string = `<div id="mensajeError"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: block; top: 20px; right: 20px; z-index: 99999; position: absolute; width: 300px;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;
    
                    $(".navbar").append(mensaje);
                }
            });

            callBackResponse.status = false;
            callBackResponse.error = this.notificationMessage;

            $("#loading").remove();
            
            return callBackResponse;
        })
        .catch(() => {

            this.notificationMessage = `Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action})`;
            this.notificationShow = true;

            let response: any = {
                error: this.notificationMessage,
                status: false
            }

            let mensaje: string = `<div id="messageNotification"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: block; top: 20px; right: 20px; z-index: 99999; position: absolute; width: 300px;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;

            $(".navbar").append(mensaje);

            $("#loading").remove();

            return response;

        });

        return response;
    }

    sendData = (controller: string, action: string = '', data: any) => {
        this.controller = controller;
        this.action = action;

        let sessionString: string = sessionStorage.getItem("globalState") || '';
        let objectSession: any = {
            token: ""
        };

        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        }

        data.token = objectSession.token;

        this.url = (this.host === undefined ? '' : this.host) + (this.module === undefined ? '' : this.module) + '/' + this.controller + '/' + this.action
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };


        let response: any = fetch(this.url, requestOptions)
            .then((responseCall: any) => {
                let callBackResponse = responseCall.json();

                callBackResponse.then((response: any) => {
                    if(!response.status){
                        if(response.error === -1){
                            sessionStorage.setItem("sessionData", "");
                            window.location.reload();
                        }

                        this.notificationMessage = /*`Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action}),*/` error: ${response.error}`;
                        this.notificationShow = true;
        
                        let mensaje: string = `<div class="messageNotification"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;
        
                        $(".c-wrapper").append(mensaje);
                    }
                });

                callBackResponse.status = false;
                callBackResponse.error = this.notificationMessage;

                $("#loading").remove();

                return callBackResponse;
            })
            .catch((result) => {
                
                this.notificationMessage = `Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action})`;
                this.notificationShow = true;

                let response: any = {
                    error: this.notificationMessage,
                    status: false
                }

                let mensaje: string = `<div id="messageNotification"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: block; top: 20px; right: 20px; z-index: 99999; position: absolute; width: 300px;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;

                $(".c-wrapper").append(mensaje);

                $("#loading").remove();

                return response;
            });

        return response;
    }

    makeURL = (url: string, existsParam?: boolean) => {
        let sessionString: string = sessionStorage.getItem("globalState") || '';
        let objectSession: any = {
            token: ""
        };

        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        }

        return url + (existsParam === undefined ? "?" : "&") + "token=" + objectSession.token;
    }

    getToken(){
        let sessionString: string = sessionStorage.getItem("globalState") || '';
        let objectSession: any = {
            token: ""
        };

        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        } 

        return objectSession.token;
    }

    sendFile = (controller: string, action: string = '', data: FormData) => {

        
        this.controller = controller;
        this.action = action;

        let sessionString: string = sessionStorage.getItem("globalState") || '';
        let objectSession: any = {
            token: ""
        };

        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        }

        data.append("token", objectSession.token);
        
        this.url = (this.host === undefined ? '' : this.host) + (this.module === undefined ? '' : this.module) + '/' + this.controller + '/' + this.action
        const requestOptions = {
            method: 'POST',
            body: data
        };

        let response: any = fetch(this.url, requestOptions)
            .then((responseCall: any) => {
                let callBackResponse = responseCall.json();

                callBackResponse.then((response: any) => {
                    if(!response.status){
                        if(response.error === -1){
                            sessionStorage.setItem("sessionData", "");
                            window.location.reload();
                        }

                        this.notificationMessage = /*`Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action}),*/` error: ${response.error}`;
                        this.notificationShow = true;
        
                        let mensaje: string = `<div class="messageNotification"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 100%;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;
        
                        $(".c-wrapper").append(mensaje);
                    }
                });

                callBackResponse.status = false;
                callBackResponse.error = this.notificationMessage;

                $("#loading").remove();

                return callBackResponse;
            })
            .catch((error) => {
               
                this.notificationMessage = `Ocurrio un error en la llamada al controlador: (${controller}) en la acción: (${action})`;
                this.notificationShow = true;

                let response: any = {
                    error: this.notificationMessage,
                    status: false
                }

                let mensaje: string = `<div id="messageNotification"><div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: block; top: 20px; right: 20px; z-index: 99999; position: absolute; width: 300px;"><strong>${this.notificationMessage}</strong><button onClick="getElementById('mensajeError').remove();" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>`;

                $(".c-wrapper").append(mensaje);

                $("#loading").remove();

                return response;
            });

        return response;
    }

}

export default ApiTorak;
