Sunil Pay
The Laravel 5 Package for Indian Payment Gateways. Currently supported gateway: CCAvenue, PayUMoney, EBS, CitrusPay ,ZapakPay (Mobikwik), Mocker

For Laravel 4.2 Package Click Here

Installation
Step 1: Install package using composer.json add some code
	
	"repository":[
		{
			"type":"vcs",
			"url":"https://sunilahir880@bitbucket.org/sunilahir880/sunil.git"
		}
	]
    "require": {
        "sunil/payments": "dev/master#1.*",
    },
	"autoload": {
      "psr-4": {
        "Sunil\\Payments\\": "vendor/sunil/payments/src/"
      }
    }


 composer update
    
Step 2: Add the service provider to the config/app.php file in Laravel (Optional for Laravel 5.5)


    Sunil\Payments\PaymentServiceProvider::class,
Step 3: Add an alias for the Facade to the config/app.php file in Laravel (Optional for Laravel 5.5)


    'Payments' => Sunil\Payments\Facades\Ggpay::class,
Step 4: Publish the config & Middleware by running in your terminal


    php artisan vendor:publish
Step 5: Modify the app\Http\Kernel.php to use the new Middleware. This is required so as to avoid CSRF verification on the Response Url from the payment gateways. You may adjust the routes in the config file config/ggpay.php to disable CSRF on your gateways response routes.


    App\Http\Middleware\VerifyCsrfToken::class,
to


    App\Http\Middleware\VerifyCsrfMiddleware::class,
Usage
Edit the config/ggpay.php. Set the appropriate Gateway and its parameters. Then in your code... 

Initiate Purchase Request and Redirect using the default gateway:-

    use Sunil\Payments\Facades\Ggpay;  
    
    
      /* All Required Parameters by your Gateway */
      
     $parameters = [
                     'tid' =>uniqid(),
                     'order_id' => '123',
                     'payment_mode' => 'PayUbiz',
                     'amount' => $booking_details->grand_total,
                     'firstname' => 'Sunil',
                     'lastname' => 'Karmur',
                     'email' => 'sunilahir880@gmail.com',
                     'phone' => '8128273971',
                     'productinfo' => $booking_details->order_id, // For the Payumoney and PayUbiz Gateway Optional Paramater
                     'redirect_url' => 'http://localhost:3000/payUbiz/payment',
                     'domain' => 'FLIGHT',
                 ];
    // gateway = CCAvenue / PayUMoney / EBS / Citrus / InstaMojo / ZapakPay / Mocker / CitrusPopup / Paypal
    if(empty($payment_mode) || env('IS_DEFAULT_GATEWAY')==true)
        $order = Ggpay::prepare($parameters);
    else
        $order = Ggpay::gateway($payment_mode)->prepare($parameters);
    return Ggpay::process($order);

Get the Response from the Gateway (Add the Code to the Redirect Url Set in the config file. Also add the response route to the remove_csrf_check config item to remove CSRF check on these routes.):-

 
    public function response(Request $request)
    
    {
        if(isset($request->Order)){
        $response = Ggpay::gateway($request->Domain)->response($request);
        if(is_array($response))
            $response['payment_method']='Citrus';
    }elseif (isset($request->productinfo)){
        $response = Ggpay::gateway('PayUMoney')->response($request);
        if(is_array($response))
            $response['payment_method']='PayUMoney';
    }else if(isset($request->payment_mode) && $request->payment_mode=='Paypal'){
    
        // Paypal Response
    }else{
        $response = Ggpay::response($request); 
        if(is_array($response))
            $response['payment_method']='Other';
    }
    dd($response);

    
    } 
    

Add to environment variable .env file
    
    PAYMENT_MODE=true
    DEFAULT_GATEWAY=CitrusPopup
    IS_DEFAULT_GATEWAY=false
    
    #Citrus Merchant Credential
    INDIPAY_CITRUS_VANITY_URL=globalgarner
    INDIPAY_WORKING_KEY=86843cb5a6382e30e3a0b17de5da7e6ae17542c3
    INDIPAY_SUCCESS_URL=http://localhost/payment_integration_demo/public/indipay/response
    INDIPAY_SUCCESS_URL=http://localhost/payment_integration_demo/public/indipay/response
    
    #payumoney Merchant Credential
    INDIPAY_MERCHANT_KEY=gUWQRy3Y
    INDIPAY_SALT=Y2wMsSbL4X
    INDIPAY_WORKING_KEY=MISJh5xXxyyfdfmKYawmBVQTTORX8nj2qd/W/TfEXIg=
    INDIPAY_SUCCESS_URL=http://localhost/payment_integration_demo/public/indipay/response
    INDIPAY_FAILURE_URL=http://localhost/payment_integration_demo/public/indipay/response
    
    #paypal Payment Gateway Credential
    PAYPAL_CLIENT_SANBOX=AZfQEnIIPdhoYe_VaFQv7U_UExCuVhzlQ1k8bVRb85F81_tr33f_L7UMX3o2Z8KJf6pm9Z3ipmdJ34QO
    PAYPAL_SECRET_SANBOX=EBbtN4OHIIJZbm9mim5fRQ1ML9HbJkotbmwOUlE4yiqPJPP3-YpBVuaC7WTgskY4gThbEJOL7CQFE7Jn
    
    PAYPAL_CLIENT_PRODUCTION=AZfQEnIIPdhoYe_VaFQv7U_UExCuVhzlQ1k8bVRb85F81_tr33f_L7UMX3o2Z8KJf6pm9Z3ipmdJ34QO
    PAYPAL_SECRET_PRODUCTION=EBbtN4OHIIJZbm9mim5fRQ1ML9HbJkotbmwOUlE4yiqPJPP3-YpBVuaC7WTgskY4gThbEJOL7CQFE7Jn
        
    PAYPAL_MODE=sandbox // sandbox | production
    PAYPAL_RETURN_URL=http://localhost/payment_integration_demo/public/indipay/response
    PAYPAL_CANCEL_URL=http://localhost/payment_integration_demo/public/indipay/response