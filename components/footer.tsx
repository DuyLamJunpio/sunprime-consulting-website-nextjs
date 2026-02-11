import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="pt-0 pb-0">
      <div className="container lg:px-0 mx-auto px-0">
        <div className="lg:px-10 lg:py-12 bg-neutral-50 border-neutral-200 border rounded-3xl p-10 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-50">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9.18 9.18c.054-.052.149-.118.451-.159c.323-.043.761-.044 1.439-.044h1.86c.678 0 1.116.001 1.438.044c.303.041.398.107.45.16c.054.053.12.148.16.45c.044.323.045.761.045 1.439v1.86c0 .678-.001 1.116-.045 1.438c-.04.303-.106.398-.16.45c-.052.054-.147.12-.45.16c-.322.044-.76.045-1.438.045h-1.86c-.678 0-1.116-.001-1.439-.045c-.302-.04-.397-.106-.45-.16c-.053-.052-.119-.147-.16-.45c-.043-.322-.044-.76-.044-1.438v-1.86c0-.678.001-1.116.044-1.439c.041-.302.107-.397.16-.45" opacity=".5" />
                    <path fill="currentColor" fillRule="evenodd" d="M12.698 2.698a.698.698 0 0 0-1.396 0v2.79q-.764 0-1.395.017V2.698a.698.698 0 0 0-1.395 0v2.79q0 .056.008.108c-.936.115-1.585.353-2.078.846s-.731 1.142-.846 2.078a1 1 0 0 0-.108-.008h-2.79a.698.698 0 0 0 0 1.395h2.807q-.016.63-.016 1.395H2.698a.698.698 0 0 0 0 1.396h2.79q0 .764.017 1.395H2.698a.698.698 0 0 0 0 1.395h2.79a1 1 0 0 0 .108-.008c.115.936.353 1.585.846 2.078s1.142.731 2.078.846a1 1 0 0 0-.008.108v2.79a.698.698 0 0 0 1.395 0v-2.807q.63.016 1.395.016v2.791a.698.698 0 0 0 1.396 0v-2.79q.764 0 1.395-.017v2.807a.698.698 0 0 0 1.395 0v-2.79a1 1 0 0 0-.008-.108c.936-.115 1.585-.353 2.078-.846s.731-1.142.846-2.078q.053.009.108.008h2.79a.698.698 0 0 0 0-1.395h-2.807q.016-.63.016-1.395h2.791a.698.698 0 0 0 0-1.396h-2.79q0-.764-.017-1.395h2.807a.698.698 0 0 0 0-1.395h-2.79a1 1 0 0 0-.108.008c-.115-.936-.353-1.585-.846-2.078s-1.142-.731-2.078-.846a1 1 0 0 0 .008-.108v-2.79a.698.698 0 0 0-1.395 0v2.807a56 56 0 0 0-1.395-.016zm-3.252 4.94c.426-.057.96-.057 1.578-.057h1.952c.619 0 1.151 0 1.578.058c.458.061.896.2 1.252.555c.355.356.494.794.555 1.252c.058.426.058.96.058 1.578v1.952c0 .619 0 1.151-.058 1.578c-.061.458-.2.896-.555 1.252c-.356.355-.794.494-1.252.555c-.427.058-.96.058-1.578.058h-1.952c-.619 0-1.152 0-1.578-.058c-.458-.061-.896-.2-1.252-.555c-.355-.356-.494-.794-.555-1.252c-.058-.427-.058-.96-.058-1.578v-1.952c0-.619 0-1.152.058-1.578c.061-.458.2-.896.555-1.252c.356-.355.794-.494 1.252-.555" clipRule="evenodd" />
                    <path fill="currentColor" d="M12.966 10.545a.698.698 0 0 0-1.135-.811l-1.329 1.86a.698.698 0 0 0 .568 1.103h.505l-.541.758a.698.698 0 1 0 1.135.81l1.329-1.86a.698.698 0 0 0-.568-1.103h-.505z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-neutral-900 tracking-tight font-geist">start.agency</span>
                  <span className="text-[11px] uppercase text-neutral-400 tracking-[0.16em] font-geist">Start with design</span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 max-w-sm font-geist">
                We partner with startups on early stage and help them solve problems with
                efficient design.
              </p>
              <div className="flex items-center gap-3 text-neutral-500">
                <a href="#" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-400 hover:text-neutral-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Service</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Website design</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Product design</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Brand identity</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Website development</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Case studies</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Project 1</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Project 2</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Project 3</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Project 4</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 font-geist">Company</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Studio</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Clients</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Careers</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors font-geist">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-100 pt-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-neutral-400">
              <p className="font-geist">© 2025 start.agency</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:text-neutral-700 transition-colors font-geist">Privacy Policy</a>
                <a href="#" className="hover:text-neutral-700 transition-colors font-geist">Terms of Service</a>
                <a href="#" className="hover:text-neutral-700 transition-colors font-geist">Data Processing</a>
                <a href="#" className="hover:text-neutral-700 transition-colors font-geist">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
