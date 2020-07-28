import socket, time, os, requests, logging
from datetime import datetime
from flask import Flask, request

from cpu_stress import CpuStress


ENV = os.environ
VERSION_DEP = ENV['VERSION_DEP'] if 'VERSION_DEP' in ENV else 'local'
APP_PORT = ENV['APP_PORT'] if 'APP_PORT' in ENV else '5000'
HOST = socket.gethostname()

app = Flask(__name__)


@app.route("/cpu")
def app_root():
    gets = request.args
    sleep = gets.get('sleep') if gets.get('sleep') else 0
    cpus = gets.get('cpus') if gets.get('cpus') else None
    date_launch = gets.get('date') if gets.get('date') else None
    time_ini = str(datetime.now())

    # proccess
    if cpus:
        CpuStress(sleep, cpus).run()
    else:
        time.sleep(int(sleep))

    time_end = str(datetime.now())
    response = """
    <pre>
    <b>Hello World!</b>

    version:        {version}
    host_name:      {host}
    ___
    sleep_time:     {sleep}
    stress_cpus:    {cpus_s}
    ___
    date_launch:    {date_launch}
    time_ini:       {time_ini}
    time_end:       {time_end}
    </pre>
    """.format(version=VERSION_DEP, host=HOST, sleep=sleep, cpus_s=cpus,
               date_launch=date_launch, time_ini=time_ini, time_end=time_end)
    
    return response


@app.route('/get/<domain>', methods=['GET', 'POST'])
def path_get(domain):
    result = 'none'
    
    get_path = request.args['path'] if 'path' in request.args else None

    full_path = request.full_path.replace('/get/', '')

    if domain == 'none':
        full_path == 'localhost:{}'.format(APP_PORT)
    elif get_path:
        full_path = '{}{}?'.format(domain, get_path)
        for key in request.args:
            if key != 'path':
                value = request.args[key]
                full_path = '{}&{}={}'.format(full_path, key, value)

    logging.warning('FULL_GET: ' + full_path)

    # try get
    try:
        result = requests.get('http://{}'.format(full_path))
    except Exception as e:
        try:
            result = requests.get('https://{}'.format(full_path))
        except Exception as e:
            logging.error(str(e))

    return result.text


if __name__ == "__main__":
    app.run(port=APP_PORT)
