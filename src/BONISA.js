/*!
 * bonisa.js
 * AGPL-3.0 licensed
 *
 * 
 * --> this file is a bonisa.js modification
 */

/*
 * *************** | FUNCTION | ***************
 * 
 * Anonymous self-invoking function
 * 
 * ********************************************
 * 
 * This function recieves the Window object
 * and an anonymous function that defines
 * all Bonisa features, making it available
 * to the global scope
 * 
 * ********************************************
 * 
 * @param {Window} root
 * @param {function} factory
 * @returns {void}
 * 
 */
(function(root, factory){
    root.Bonisa = factory();
    
    // Calling Bonisa
    root.Bonisa.init();
}(this, function(){
    // using strict mode
    'use strict';
    
    /* ---------- INITIAL VARIABLES ---------- */
    var 
        // Bonisa object
        Bonisa, 
        
        // Bonisa version
        VERSION = '0.1-alpha.0',
        
        // Bonisa functions
            // Help functions
            help, htmlHelp, showModules,  
            
            // Initialize function
            init,
            
            // Load function
            load,
            
            // Start function
            start,
            
        // Bonisa flags
            // Modules
            modules = {available: [
                    // Bonisa available modules
                        // Showdown = Markdown to HTML Converter
                        {
                            name: 'showdown',
                            version: '^1.8.6',
                            description: 'Markdown to HTML Converter',
                            keywords: ['md', 'mdconverter', 'md2html'],
                            first: '0.0.3',
                            last: VERSION,
                            status: 'available',
                            file: '/showdown/dist/showdown.js',
                            loaded: false
                        }
                    ],
                    
                    // Bonisa loaded modules
                        loaded: [],
                        
                    // Directory for modules scripts
                        modulesDir: '../src/node_modules/'
            },
            
            // Structure - DOM Reference
            dom = {},
            
        // Generic flags
            // Is initialized
            initialized = false,
            
            // Is loaded
            loaded = false
        ; 
    
    /* --------------- FUNCTIONS --------------- */
    
    init = function(params){
        // Initializes just once
            // Check
            if(initialized === true){return;}
                
            // Change initializes flag
            initialized = true;
        
        //
        // Check user agent
        //
        
        // Check params
        if(params){
            console.log('\nReceived the params: ' + JSON.stringify(params) + '\n\n');
            
            // Check modules and load them
                if(params.modules){
                    load(params.modules);
                }
                
            //
            // Here will be included codes to allow
            // slides creation with just .md/.json
            // and DOM
            //
            
        }
        
        // Basic DOM structure
            dom.wrapper = document.querySelector('*');
            
        
        // Start slides structure
            start();
    };
    
    /*
     * Loads bonisa external modules
     * @returns {undefined}
     */
    load = function(modules){
        // Turn modules to Array
            if(! modules instanceof Array)
                modules = new Array(modules);
        
        // Check if the requested modules are available
            modules.forEach(function(mod){
                // Convert to lowercase string
                mod = mod.toString().toLowerCase();

                // Search modules
                Bonisa.modules.available.forEach(function(bonisaModule){
                    /*
                     * 
                     * If an module is called multiple time, 
                     * it will just be loaded once
                     * 
                     * 
                     */
                    // By Name
                    if(bonisaModule.name === mod && !bonisaModule.loaded){
                        
                        // Change module.loaded to 'true'
                        bonisaModule.loaded = true;
                        
                        // Load the module to Bonisa.modules.loaded
                        Bonisa.modules.loaded[Bonisa.modules.loaded.length] = bonisaModule;
                    }

                    // By keyword
                    else{
                        bonisaModule.keywords.forEach(function(keyword){
                            if(keyword === mod && !bonisaModule.loaded){
                                // Change module.loaded to 'true'
                                bonisaModule.loaded = true;
                                
                                // Load the module to Bonisa.modules.loaded
                                Bonisa.modules.loaded[Bonisa.modules.loaded.length] = bonisaModule;
                            }
                        });
                    }
                });
            });
        
        // Load requested modules
        Bonisa.modules.loaded.forEach(function(mod){
            // Try require() -- for Node use
            try{
                require(mod.name);
                console.log('\nNODE -- ' + mod.name);
            }
            catch(err){
                // Catch an error
                
                // Dynamic includes the module
                    var
                        // 'script' DOM  element
                        modScript = document.createElement('script');
                        
                        // 'script' source file
                        modScript.src = 
                            // Module directory    
                            Bonisa.modules.modulesDir + 
                            
                            // Module file
                            mod.file
                    ;
                        
                    // Appends
                    document.head.appendChild(modScript);
            }
        });

        // that's all
        console.log('Bonisa modules are loaded!')  ;
    };
    
    start = function(){
        // Change loaded flag to "true"
            loaded = true;
            
        
            
    };
    
    /*
     * *************** | HELP Functions | ***************
     * 
     * Returns the standard variable "textHelp" as:
     * 
     * --> Pure String [md formated]: help()
     * --> HTML formated: htmlHelp()
     * 
     * ******************************************** 
     * 
     * @returns {String}
     */
    help = function(){
        return(
            'Welcome to Bonisa ' + VERSION + '\n' +
            'COMMANDS\n' +
            '[... INSERT COMANDS ...]'
        );
    };
    
    htmlHelp = function(){
        return(help().toString().replace('\n', '<br/>'));
    };
    
    showModules = function(){
        console.log('Showing the modules \n\n' + JSON.stringify(Bonisa.modules.available));
    };
    
    /* ------------------ API ------------------ */
    Bonisa = {
        // Version
        version: VERSION,
        
        // Help functions
        help: help,
        htmlHelp: htmlHelp,
        showModules: showModules,
        
        // Main functions
        init: init,
        load: load,
        start: start,
        
        // Structure
        structure: dom,
        
        // Modules
        modules: modules
    };
    
   
    /* ----------------- RETURNS ---------------- */
    return Bonisa;
}));