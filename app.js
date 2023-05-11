const valuE = 50;

function result(){

    let W = parseInt(document.getElementById("weigth").value)
    let balance = parseInt(document.getElementById("Balance").value)
    let hF = parseInt(document.getElementById("highF").value)
    let hR = parseInt(document.getElementById("highR").value)
    let selected = document.getElementById('select').value;
    
    const h = (hF + hR) / 2;
    const Wf = W * (balance/100); // weight on the front axle in kg
    const Wr = W  * (1 - (balance/100)); // weight on the rear axle in kg
    const Cw = 0.8; // cornering weight transfer coefficient
    const L = 2.5; // distance between the front and rear axles in meters (assumed value)
    const g = 9.81; // acceleration due to gravity in m/s^2 
    const hightValueRollbar = 65;
    const loWerValueRollbar = 1;
    const Kf = ((Wf / Wr - 1) * Cw * (L / Wf) * g) / h;
    const Kr = ((Wf / Wr - 1) * Cw * (L / Wr) * g) / h;

    const kFnt = Math.abs(Kf * (10**5));
    const kRar = Math.abs((Kr * (10**5)) * (1 - (balance/100)));
   //anti roll bar rally
    const kFntRally = Math.abs(g * Wf * (2.5 **2)/ (360 * 20));
    const kRarRally = Math.abs(g * Wr * (2.5 **2)/ (360 * 20));

    // spring
    const fSpring = Wf * g;
    const rSpring = Wr * g;
    const xSpring = 0.03;
    const kSpringf = fSpring / xSpring;
    const kSpringr = rSpring / xSpring;
    // spring rally
    const kSpringfRally = (fSpring / xSpring) / 2;
    const kSpringrRally = (rSpring / xSpring) / 3;

    
    // damping and rebound
    const dampingf = W / ((kSpringf / Wf ) *  (xSpring * g)) ;
    const dampingr = W / ((kSpringr / Wr ) *  (0.05 * g)) ;
    const reboundf = W / ((kSpringr / Wr ) *  (0.04 * g)) ;
    const reboundr = W / ((kSpringr / Wr ) *  (0.06 * g)) ;
 
    
    switch (selected) {
        case "Race" :
            if (kFnt >= hightValueRollbar) {
                document.getElementById('atRbFnt').innerHTML = hightValueRollbar.toFixed(1);
            }
            else if (kFnt <= loWerValueRollbar) {
                document.getElementById('atRbFnt').innerHTML = loWerValueRollbar.toFixed(1);
            } else {
                document.getElementById('atRbFnt').innerHTML = kFnt.toFixed(1);
            }
            if (kRar >= hightValueRollbar) {
                document.getElementById('atRbRar').innerHTML = hightValueRollbar.toFixed(1);
            }
            else if (kRar <= loWerValueRollbar) {
                document.getElementById('atRbRar').innerHTML = loWerValueRollbar.toFixed(1);
            } else {
                document.getElementById('atRbRar').innerHTML = kRar.toFixed(1);
            }
            document.getElementById('springf').innerHTML = kSpringf.toFixed(1);
            document.getElementById('springr').innerHTML = kSpringr.toFixed(1);
            document.getElementById('dampingF').innerHTML = dampingf.toFixed(1);
            document.getElementById('dampingR').innerHTML = dampingr.toFixed(1);
            document.getElementById('reboundf').innerHTML = reboundf.toFixed(1);
            document.getElementById('reboundr').innerHTML = reboundr.toFixed(1);   
            break;     
           
        case "Rally"  :
            if (kFnt >= hightValueRollbar) {
                document.getElementById('atRbFnt').innerHTML = hightValueRollbar.toFixed(1);
            } 
            else if (kFnt <= loWerValueRollbar) {
                document.getElementById('atRbFnt').innerHTML = loWerValueRollbar.toFixed(1);
            }
             else {
                document.getElementById('atRbFnt').innerHTML = kFntRally.toFixed(1);
            }
            if (kRar >= hightValueRollbar) {
                document.getElementById('atRbRar').innerHTML = hightValueRollbar.toFixed(1);
            }
            else if (kFnt <= loWerValueRollbar) {
                document.getElementById('atRbRar').innerHTML = loWerValueRollbar.toFixed(1);
            }
             else {
                document.getElementById('atRbRar').innerHTML = kRarRally.toFixed(1);
            }
            document.getElementById('springf').innerHTML = kSpringfRally.toFixed(1);
            document.getElementById('springr').innerHTML = kSpringrRally.toFixed(1);
            document.getElementById('dampingF').innerHTML = (dampingf / 2).toFixed(1);
            document.getElementById('dampingR').innerHTML = (dampingr / 3).toFixed(1);
            document.getElementById('reboundf').innerHTML = 1.5;
            document.getElementById('reboundr').innerHTML = 1.5;
            break;  
    }
}