def inserirAgenda():
    clearScreen()
    print("+------------------------------------------------+")
    print("| Agenda de Medicamentos - Inserir Agenda        |")
    print("+------------------------------------------------+")

    idPaciente=input("Informe o ID do Paciente: ")
    medicamento=input("Informe o Nome do Medicamento: ")
    dosagem=input("Informe a dosagem do Mecidamento: ")
    intervalo=int(input("Informe o Intervalo em horas: "))
    qtdeDias=int(input("Informe por quantos dias: "))
    
    dataPri=input("Informe a data da Primeira Dose (AAAA-MM-DD): ")
    ano,  mes, dia = map(int, dataPri.split('-'))
    dataPri=date(year=ano, month=mes, day=dia)

    horaPri=input("Informe a Hora da Primeira Dose (HH:MM): ")
    hora, min = map(int, horaPri.split(":"))
    horaPri=time(hour=hora, minute=min)

    dosesDia = int(24 / intervalo)
    dosesTotal = dosesDia * qtdeDias
    dataDose = datetime.combine(dataPri, horaPri)

    print(dataDose)
    
    dbCon = db.conectarBanco()
    dbSql = dbCon.cursor()

    for x in range(dosesTotal):
        if x > 0:
            dataDose = dataDose + timedelta(hours=(intervalo))
        sql = ("INSERT INTO agenda(idPaciente, medicamento, qtde, quando) VALUES(%s, %s, %s, %s)")
        val = (idPaciente, medicamento, dosagem, dataDose)
        dbSql.execute(sql, val)
    
    dbCon.commit()