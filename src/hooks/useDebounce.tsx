
export default function Debounce(cb: any , delay: number = 500)  {

    
      let timeout: any;

      return (...args: any) =>
      {
            clearTimeout(timeout);

            timeout = setTimeout(() =>
            {
                  // @ts-ignore
                  cb.apply(this, args);
                  
            }, delay);
            
      }

}